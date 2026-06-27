import { CheckCircle2, KeyRound, LockKeyhole, Play, RotateCcw, ShieldCheck, UsersRound, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { generateRoom } from './escape-room/roomEngine';
import { hashSeed } from './escape-room/rng';
import { clearSavedRoom, loadSavedRoom, saveRoom } from './escape-room/storage';
import type { RoomSession } from './types';

const defaultNames = ['', '', ''];
const maxAttemptsPerLock = 2;

type Feedback = {
  lockId: string;
  kind: 'correct' | 'incorrect' | 'failed';
  message: string;
} | null;

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatElapsedTime(startIso: string, endIso: string): string {
  const elapsedSeconds = Math.max(0, Math.round((new Date(endIso).getTime() - new Date(startIso).getTime()) / 1000));
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min ${seconds.toString().padStart(2, '0')} sec`;
  }

  return `${minutes} min ${seconds.toString().padStart(2, '0')} sec`;
}

function buildCompletionCode(room: RoomSession, totalAttempts: number): string {
  const challengeSignature = room.locks.map((lock) => lock.challengeId).join('|');
  const codeNumber = hashSeed(`${room.seedText}|${challengeSignature}|${totalAttempts}|${room.failedLocks.join(',')}`);
  return `CSA-COND-${codeNumber.toString(16).toUpperCase().slice(0, 6)}`;
}

function App() {
  const [classCode, setClassCode] = useState('Conditionals-P4');
  const [studentNames, setStudentNames] = useState(defaultNames);
  const [room, setRoom] = useState<RoomSession | null>(null);
  const [savedRoom, setSavedRoom] = useState<RoomSession | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    setSavedRoom(loadSavedRoom());
  }, []);

  const canStart = useMemo(() => {
    return classCode.trim().length > 0 && studentNames.some((name) => name.trim().length > 0);
  }, [classCode, studentNames]);

  const startRoom = () => {
    if (!canStart) {
      return;
    }

    const nextRoom = generateRoom(classCode, studentNames);
    saveRoom(nextRoom);
    setRoom(nextRoom);
    setSavedRoom(nextRoom);
    setFeedback(null);
  };

  const resumeRoom = () => {
    if (savedRoom) {
      setRoom(savedRoom);
      setClassCode(savedRoom.classCode);
      setStudentNames([...savedRoom.studentNames, ...defaultNames].slice(0, 3));
      setFeedback(null);
    }
  };

  const resetRoom = () => {
    clearSavedRoom();
    setRoom(null);
    setSavedRoom(null);
    setFeedback(null);
  };

  const answerCurrentLock = (choiceId: string) => {
    if (!room) {
      return;
    }

    const failedLocks = room.failedLocks ?? [];
    const processedLocks = [...room.completedLocks, ...failedLocks];
    const activeLockIndex = processedLocks.length;
    const activeLock = room.locks[activeLockIndex];
    const selectedChoice = activeLock?.choices.find((choice) => choice.id === choiceId);

    if (!activeLock || !selectedChoice) {
      return;
    }

    const nextAttemptsByLock = {
      ...room.attemptsByLock,
      [activeLock.lockId]: (room.attemptsByLock[activeLock.lockId] ?? 0) + 1,
    };

    if (!selectedChoice.isCorrect) {
      const attemptsForLock = nextAttemptsByLock[activeLock.lockId];
      const shouldFailLock = attemptsForLock >= maxAttemptsPerLock;
      const nextFailedLocks = shouldFailLock && !failedLocks.includes(activeLock.lockId)
        ? [...failedLocks, activeLock.lockId]
        : failedLocks;
      const isRoomFinished = room.completedLocks.length + nextFailedLocks.length === room.locks.length;
      const nextRoom = {
        ...room,
        attemptsByLock: nextAttemptsByLock,
        failedLocks: nextFailedLocks,
        completedAt: isRoomFinished ? new Date().toISOString() : room.completedAt,
      };

      saveRoom(nextRoom);
      setRoom(nextRoom);
      setSavedRoom(nextRoom);
      setFeedback({
        lockId: activeLock.lockId,
        kind: shouldFailLock ? 'failed' : 'incorrect',
        message: shouldFailLock
          ? 'Two incorrect attempts. This lock receives 0 points and the next lock is now available.'
          : 'Not quite. You have 1 attempt remaining before this lock receives 0 points.',
      });
      return;
    }

    const nextCompletedLocks = room.completedLocks.includes(activeLock.lockId)
      ? room.completedLocks
      : [...room.completedLocks, activeLock.lockId];

    const nextRoom = {
      ...room,
      attemptsByLock: nextAttemptsByLock,
      completedLocks: nextCompletedLocks,
      failedLocks,
      completedAt: nextCompletedLocks.length + failedLocks.length === room.locks.length ? new Date().toISOString() : room.completedAt,
    };

    saveRoom(nextRoom);
    setRoom(nextRoom);
    setSavedRoom(nextRoom);
    setFeedback({
      lockId: activeLock.lockId,
      kind: 'correct',
      message:
        nextCompletedLocks.length === room.locks.length
          ? 'Final lock opened. The room is complete.'
          : 'Correct. The next lock is now available.',
    });
  };

  if (room) {
    const failedLocks = room.failedLocks ?? [];
    const processedCount = room.completedLocks.length + failedLocks.length;
    const activeLockIndex = processedCount;
    const currentLock = room.locks[activeLockIndex];
    const solvedCount = room.completedLocks.length;
    const failedCount = failedLocks.length;
    const totalAttempts = Object.values(room.attemptsByLock).reduce((sum, attempts) => sum + attempts, 0);
    const isComplete = processedCount === room.locks.length;
    const completedAt = room.completedAt ?? new Date().toISOString();
    const completionCode = buildCompletionCode(room, totalAttempts);

    return (
      <main className="app-shell">
        <section className="room-header" aria-label="Active escape room">
          <div>
            <p className="eyebrow">AP CSA Conditional Escape Room</p>
            <h1>{room.classCode}</h1>
            <p className="subtle">
              Team: {room.studentNames.join(' + ')} · Seed #{room.seedNumber}
            </p>
          </div>
          <button className="icon-button" type="button" onClick={resetRoom} aria-label="Reset saved room">
            <RotateCcw size={20} />
          </button>
        </section>

        <section className="control-strip" aria-label="Room status">
          <div>
            <span className="metric-value">{activeLockIndex + (isComplete ? 0 : 1)}</span>
            <span className="metric-label">Current lock</span>
          </div>
          <div>
            <span className="metric-value">{solvedCount}</span>
            <span className="metric-label">Solved</span>
          </div>
          <div>
            <span className="metric-value">{failedCount}</span>
            <span className="metric-label">Zero scores</span>
          </div>
        </section>

        <section className="progress-track" aria-label="Lock progress">
          {room.locks.map((lock, index) => {
            const isSolved = room.completedLocks.includes(lock.lockId);
            const isFailed = failedLocks.includes(lock.lockId);
            const isCurrent = index === activeLockIndex && !isComplete;

            return (
              <div
                className={`progress-step ${isSolved ? 'is-solved' : ''} ${isFailed ? 'is-failed' : ''} ${isCurrent ? 'is-current' : ''}`}
                key={lock.lockId}
                aria-label={`Lock ${index + 1}: ${isSolved ? 'solved' : isFailed ? 'failed' : isCurrent ? 'current' : 'locked'}`}
              >
                {isSolved ? <CheckCircle2 size={18} /> : isFailed ? <XCircle size={18} /> : isCurrent ? <KeyRound size={18} /> : <LockKeyhole size={18} />}
                <span>{index + 1}</span>
              </div>
            );
          })}
        </section>

        {(feedback?.kind === 'correct' || feedback?.kind === 'failed') && !isComplete ? (
          <div className={`feedback ${feedback.kind} unlock-feedback`}>
            {feedback.kind === 'correct' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            <span>{feedback.message}</span>
          </div>
        ) : null}

        {isComplete ? (
          <section className="summary-panel" aria-label="Escape room completion summary">
            <div className="summary-header">
              <div>
                <p className="eyebrow">Room complete</p>
                <h2>AP CSA Conditional Escape Room Summary</h2>
                <p className="summary-instruction">Take a screenshot of this page and submit it for credit.</p>
              </div>
              <div className="completion-code">
                <span>Completion Code</span>
                <strong>{completionCode}</strong>
              </div>
            </div>

            <div className="summary-facts" aria-label="Completion details">
              <div>
                <span>Students</span>
                <strong>{room.studentNames.join(' + ')}</strong>
              </div>
              <div>
                <span>Class Code</span>
                <strong>{room.classCode}</strong>
              </div>
              <div>
                <span>Completed</span>
                <strong>{formatDateTime(completedAt)}</strong>
              </div>
              <div>
                <span>Completion Time</span>
                <strong>{formatElapsedTime(room.generatedAt, completedAt)}</strong>
              </div>
              <div>
                <span>Total Attempts</span>
                <strong>{totalAttempts}</strong>
              </div>
              <div>
                <span>Score</span>
                <strong>{solvedCount} / {room.locks.length}</strong>
              </div>
              <div>
                <span>Zero Scores</span>
                <strong>{failedCount}</strong>
              </div>
              <div>
                <span>Room Seed</span>
                <strong>{room.seedNumber}</strong>
              </div>
            </div>

            <div className="summary-table-wrap">
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Lock</th>
                    <th>Challenge</th>
                    <th>Variant</th>
                    <th>Attempts</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {room.locks.map((lock, index) => {
                    const wasFailed = failedLocks.includes(lock.lockId);
                    return (
                      <tr key={lock.lockId} className={wasFailed ? 'summary-failed-row' : ''}>
                        <td>{index + 1}</td>
                        <td>
                          <strong>{lock.title}</strong>
                          <span>{lock.category}</span>
                        </td>
                        <td>{lock.challengeId}</td>
                        <td>{room.attemptsByLock[lock.lockId] ?? 0}</td>
                        <td>{wasFailed ? '0' : '1'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ) : currentLock ? (
          <section className="active-lock" aria-label={`Current challenge: ${currentLock.title}`}>
            <div className="lock-card active-lock-card">
              <div className="lock-number">{activeLockIndex + 1}</div>
              <div>
                <p className="lock-type">{currentLock.category}</p>
                <h2>{currentLock.title}</h2>
                <p className="attempt-note">
                  Attempts: {room.attemptsByLock[currentLock.lockId] ?? 0} / {maxAttemptsPerLock}
                </p>
                <p>{currentLock.prompt}</p>
                <pre>
                  <code>{currentLock.code}</code>
                </pre>
                <div className="answer-grid">
                  {currentLock.choices.map((choice) => (
                    <button type="button" key={`${currentLock.lockId}-${choice.id}`} onClick={() => answerCurrentLock(choice.id)}>
                      {choice.label}
                    </button>
                  ))}
                </div>
                {feedback?.lockId === currentLock.lockId ? (
                  <div className={`feedback ${feedback.kind}`}>
                    {feedback.kind === 'correct' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    <span>{feedback.message}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    );
  }

  return (
    <main className="app-shell setup-shell">
      <section className="setup-panel" aria-label="Start escape room">
        <div className="brand-mark" aria-hidden="true">
          <ShieldCheck size={34} />
        </div>
        <h1 className="setup-title">AP CSA Conditional Escape Room</h1>
        <p className="intro">
          Enter the class code and team names. The same team and code will always rebuild the same room,
          while other teams receive different selected locks and shuffled answer choices.
        </p>

        <div className="form-grid">
          <label>
            <span>
              <KeyRound size={18} />
              Class code
            </span>
            <input value={classCode} onChange={(event) => setClassCode(event.target.value)} placeholder="Conditionals-P4" />
          </label>

          <label>
            <span>
              <UsersRound size={18} />
              Student 1
            </span>
            <input
              value={studentNames[0]}
              onChange={(event) => setStudentNames([event.target.value, studentNames[1]])}
              placeholder="Alice"
            />
          </label>

          <label>
            <span>
              <UsersRound size={18} />
              Student 2
            </span>
            <input
              value={studentNames[1]}
              onChange={(event) => setStudentNames([studentNames[0], event.target.value])}
              placeholder="Bob"
            />
          </label>

          <label>
            <span>
              <UsersRound size={18} />
              Student 3
            </span>
            <input
              value={studentNames[2]}
              onChange={(event) => setStudentNames([studentNames[0], studentNames[1], event.target.value])}
              placeholder="Optional"
            />
          </label>
        </div>

        <div className="action-row">
          <button className="primary-button" type="button" onClick={startRoom} disabled={!canStart}>
            <Play size={19} />
            Generate room
          </button>
          {savedRoom ? (
            <button className="secondary-button" type="button" onClick={resumeRoom}>
              Resume saved room
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default App;
