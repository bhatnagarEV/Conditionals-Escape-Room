import { KeyRound, Play, RotateCcw, ShieldCheck, UsersRound } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { generateRoom } from './escape-room/roomEngine';
import { clearSavedRoom, loadSavedRoom, saveRoom } from './escape-room/storage';
import type { RoomSession } from './types';

const defaultNames = ['', ''];

function App() {
  const [classCode, setClassCode] = useState('Conditionals-P4');
  const [studentNames, setStudentNames] = useState(defaultNames);
  const [room, setRoom] = useState<RoomSession | null>(null);
  const [savedRoom, setSavedRoom] = useState<RoomSession | null>(null);

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
  };

  const resumeRoom = () => {
    if (savedRoom) {
      setRoom(savedRoom);
      setClassCode(savedRoom.classCode);
      setStudentNames([...savedRoom.studentNames, ...defaultNames].slice(0, 2));
    }
  };

  const resetRoom = () => {
    clearSavedRoom();
    setRoom(null);
    setSavedRoom(null);
  };

  if (room) {
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
            <span className="metric-value">10</span>
            <span className="metric-label">Locks generated</span>
          </div>
          <div>
            <span className="metric-value">0</span>
            <span className="metric-label">Locks solved</span>
          </div>
          <div>
            <span className="metric-value">0</span>
            <span className="metric-label">Attempts</span>
          </div>
        </section>

        <section className="lock-grid" aria-label="Generated lock list">
          {room.locks.map((lock, index) => (
            <article className="lock-card" key={lock.lockId}>
              <div className="lock-number">{index + 1}</div>
              <div>
                <p className="lock-type">{lock.category}</p>
                <h2>{lock.title}</h2>
                <p>{lock.prompt}</p>
                <pre>
                  <code>{lock.code}</code>
                </pre>
                <div className="choice-row">
                  {lock.choices.map((choice) => (
                    <span key={choice.id}>{choice.label}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
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
