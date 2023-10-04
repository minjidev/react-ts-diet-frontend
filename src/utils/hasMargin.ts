const pathWithMargin = ['/', '/search', '/dashboard', '/main'];

const hasMargin = (pathname: string) => pathWithMargin.includes(pathname);

export default hasMargin;
