import { useState } from 'react';

const LoginForm = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 const handleSubmit = async (e: FormEvent) => {
   e.preventDefault();
   setError('');
   try {
     const response = await fetch('/api/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ username, password })
     });
     
     if (!response.ok) {
       throw new Error('Invalid credentials');
     }

     const data = await response.json();
     localStorage.setItem('token', data.access_token);
     // 로그인 성공 처리
     
   } catch (error) {
     setError('Login failed. Please try again.');
   }
 };

 return (
   <form onSubmit={handleSubmit} className="space-y-4">
     {error && (
       <div className="text-red-500 text-sm">{error}</div>
     )}
     <div>
       <input
         type="text"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         className="w-full px-3 py-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
         placeholder="Username"
         required
       />
     </div>
     <div>
       <input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="w-full px-3 py-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
         placeholder="Password"
         required
       />
     </div>
     <button
       type="submit"
       className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
     >
       Login
     </button>
   </form>
 );
};

export default LoginForm;
