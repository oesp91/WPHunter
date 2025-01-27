import LoginForm from "@components/LoginForm.tsx"

const LoginModal = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <LoginForm />
        <button onClick={onClose} className="mt-4">Close</button>
      </div>
    </div>
  ) : null;
};

export default LoginModal;
