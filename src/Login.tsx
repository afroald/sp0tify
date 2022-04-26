import { Button } from '@chakra-ui/react';

const Login = () => {
  return (
    <div>
      <Button>Login</Button>
      <br />
      hoi: {import.meta.env.VITE_FOO}
    </div>
  );
};

export default Login;
