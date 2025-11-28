import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function Employees(){
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name:'', position:''});
  const [err, setErr] = useState('');

  const load = async ()=> {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch (e) { setErr('Load failed'); }
  };
  useEffect(()=>{ load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/employees', form);
      setEmployees([res.data, ...employees]);
      setForm({ name:'', position:''});
    } catch (e) { setErr('Add failed'); }
  };

  const del = async (id) => {
    if (!confirm('Delete employee?')) return;
    await api.delete('/employees/'+id);
    setEmployees(employees.filter(x=>x._id !== id));
  };

  return (
    <div>
      <h2>Employees</h2>
      {err && <div className="error">{err}</div>}
      <form className="inline" onSubmit={add}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input placeholder="Position" value={form.position} onChange={e=>setForm({...form, position:e.target.value})} />
        <button type="submit">Add</button>
      </form>

      <div className="list">
        {employees.map(emp => (
          <div key={emp._id} className="card-row">
            <div>
              <strong>{emp.name}</strong> <div className="muted">{emp.position}</div>
            </div>
            <div>
              <button className="danger" onClick={()=>del(emp._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
