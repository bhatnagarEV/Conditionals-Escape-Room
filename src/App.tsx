import { CheckCircle2, KeyRound, LockKeyhole, Play, RotateCcw, ShieldCheck, UsersRound, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { generateRoom } from './escape-room/roomEngine';
import { clearSavedRoom, loadSavedRoom, saveRoom } from './escape-room/storage';
import type { RoomSession } from './types';

const defaultNames = ['', ''];

type Feedback = {
  lockId: string;
  kind: 'correct' | 'incorrect';
  message: string;
} | null;

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
      setStudentNames([...savedRoom.studentNames, ...defaultNames].slice(0, 2));
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

    const activeLockIndex = room.completedLocks.length;
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
      const nextRoom = {
        ...room,
        attemptsByLock: nextAttemptsByLock,
      };

      saveRoom(nextRoom);
      setRoom(nextRoom);
      setSavedRoom(nextRoom);
      setFeedback({
        lockId: activeLock.lockId,
        kind: 'incorrect',
        message: 'Not quite. Trace the code again and try another answer.',
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
    const activeLockIndex = room.completedLocks.length;
    const currentLock = room.locks[activeLockIndex];
    const solvedCount = room.completedLocks.length;
    const totalAttempts = Object.values(room.attemptsByLock).reduce((sum, attempts) => sum + attempts, 0);
    const isComplete = solvedCount === room.locks.length;

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
            <span className="metric-label">Locks solved</span>
          </div>
          <div>
            <span className="metric-value">{totalAttempts}</span>
            <span className="metric-label">Attempts</span>
          </div>
        </section>

        <section className="progress-track" aria-label="Lock progress">
          {room.locks.map((lock, index) => {
            const isSolved = room.completedLocks.includes(lock.lockId);
            const isCurrent = index === activeLockIndex && !isComplete;

            return (
              <div
                className={`progress-step ${isSolved ? 'is-solved' : ''} ${isCurrent ? 'is-current' : ''}`}
                key={lock.lockId}
                aria-label={`Lock ${index + 1}: ${isSolved ? 'solved' : isCurrent ? 'current' : 'locked'}`}
              >
                {isSolved ? <CheckCircle2 size={18} /> : isCurrent ? <KeyRound size={18} /> : <LockKeyhole size={18} />}
                <span>{index + 1}</span>
              </div>
            );
          })}
        </section>

        {feedback?.kind === 'correct' && !isComplete ? (
          <div className="feedback correct unlock-feedback">
            <CheckCircle2 size={20} />
            <span>{feedback.message}</span>
          </div>
        ) : null}

        {isComplete ? (
          <section className="completion-panel" aria-label="Escape room complete">
            <CheckCircle2 size={44} />
            <div>
              <p className="eyebrow">Room complete</p>
              <h2>All locks are open.</h2>
              <p>
                Nice work. The full screenshot-friendly completion summary will be the next grading-focused
                increment.
              </p>
            </div>
          </section>
        ) : currentLock ? (
          <section className="active-lock" aria-label={`Current challenge: ${currentLock.title}`}>
            <div className="lock-card active-lock-card">
              <div className="lock-number">{activeLockIndex + 1}</div>
              <div>
                <p className="lock-type">{currentLock.category}</p>
                <h2>{currentLock.title}</h2>
                <p>{currentLock.prompt}</p>
                <pre>
                  <code>{currentLock.code}</code>
                </pre>
                <div className="answer-grid">
                  {currentLock.choices.map((choice) => (
                    <button type="button" key={choice.id} onClick={() => answerCurrentLock(choice.id)}>
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
        <p className="eyebrow">AP CSA Conditional Escape Room</p>
        <h1>Start a deterministic conditionals room</h1>
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
