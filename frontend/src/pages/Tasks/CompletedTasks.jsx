import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function CompletedTasks(){
  const [tasks, setTasks] = useState([]);
  useEffect(()=> {
    (async ()=> {
      const res = await api.get('/tasks');
      setTasks(res.data.filter(t=> t.status === 'completed' || t.completed));
    })();
  }, []);
  return (
    <div>
      <h2>Completed Tasks</h2>
      <div className="list">
        {tasks.map(t => (
          <div key={t._id} className="card-row completed">
            <div>
              <strong>{t.title}</strong>
              <div className="muted">{t.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
