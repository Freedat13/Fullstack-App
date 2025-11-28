import React, {useEffect, useState} from 'react';
import { employees } from '../../api';

export default function Employees(){
  const [list, setList] = useState([]);
  const [form, setForm] = useState({name:'',role:'',email:'',phone:''});
  const [loading, setLoading] = useState(false);
  const fetchList = async ()=> {
    setLoading(true);
    try {
      const res = await employees.list();
      setList(res);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  }
  useEffect(()=>{ fetchList(); },[]);

  const add = async (e)=>{
    e.preventDefault();
    try {
      const res = await employees.add(form);
      setList(prev=>[res,...prev]);
      setForm({name:'',role:'',email:'',phone:''});
    } catch (err) { console.error(err); }
  }

  const remove = async (id)=>{
    if(!confirm('Delete employee?')) return;
    try {
      await employees.delete(id);
      setList(prev=>prev.filter(p=>p._id !== id));
    } catch (err) { console.error(err); }
  }

  return (
    <div className="grid">
      <div>
        <div className="card">
          <h3>Employees</h3>
          {loading ? <div className="small">Loading...</div> : list.map(e=>(
            <div key={e._id} className="list-item">
              <div>
                <div style={{fontWeight:700}}>{e.name}</div>
                <div className="small">{e.role} • {e.email || '—'}</div>
              </div>
              <div>
                <button className="btn" onClick={()=>remove(e._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="card">
          <h4>Add employee</h4>
          <form onSubmit={add}>
            <div style={{marginTop:8}}><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" required/></div>
            <div style={{marginTop:8}}><input className="input" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="Role"/></div>
            <div style={{marginTop:8}}><input className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email"/></div>
            <div style={{marginTop:8}}><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone"/></div>
            <div style={{marginTop:12}}><button className="btn">Add</button></div>
          </form>
        </div>
      </div>
    </div>
  )
}
