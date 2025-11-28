import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function TaskManagement(){
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', employeeId:'' });
  const [err, setErr] = useState('');

  const fetchAll = async ()=> {
    try {
      const [tres, eres] = await Promise.all([api.get('/tasks'), api.get('/employees')]);
      setTasks(tres.data);
      setEmployees(eres.data);
    } catch (e) { setErr('Load failed'); }
  };

  useEffect(()=>{ fetchAll(); }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', form);
      setTasks([res.data, ...tasks]);
      setForm({ title:'', description:'', employeeId:'' });
    } catch (e) { setErr('Add failed'); }
  };

  const del = async (id) => {
    if (!confirm('Delete task?')) return;
    await api.delete('/tasks/'+id);
    setTasks(tasks.filter(t=>t._id !== id));
  };

  const toggle = async (t) => {
    try {
      const res = await api.put('/tasks/complete/' + t._id);
      setTasks(tasks.map(x=> x._id === t._id ? res.data : x));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>Tasks</h2>
      {err && <div className="error">{err}</div>}
      <form className="inline" onSubmit={add}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <input placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <select value={form.employeeId} onChange={e=>setForm({...form, employeeId:e.target.value})}>
          <option value="">Unassigned</option>
          {employees.map(emp=> <option key={emp._id} value={emp._id}>{emp.name}</option>)}
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className="list">
        {tasks.map(t => (
          <div key={t._id} className={"card-row " + (t.status === 'completed' || t.completed ? 'completed' : '')}>
            <div>
              <strong>{t.title}</strong>
              <div className="muted">{t.description}</div>
              <div className="muted">Assigned: {t.employeeId ? t.employeeId.name : (t.assignedTo ? t.assignedTo.name : '—')}</div>
            </div>
            <div>
              <button onClick={()=>toggle(t)}>{(t.status === 'completed' || t.completed) ? 'Undo' : 'Complete'}</button>
              <button className="danger" onClick={()=>del(t._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
