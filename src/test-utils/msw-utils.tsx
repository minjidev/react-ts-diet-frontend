import { server } from '../tools/tests/server';

type SetupHandlersProps = Parameters<typeof server.use>;

const setupHandlers = (handlers: SetupHandlersProps) => {
  server.use(...handlers);
};

export { setupHandlers };
