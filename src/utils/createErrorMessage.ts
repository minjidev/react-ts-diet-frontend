const errorMessages: { [key: number]: string } = {
  400: 'Oops! There seems to be a small issue with your request. Please check and try again.',
  401: "Looks like you need to log in to see this. Let's get you logged in!",
  403: 'Sorry, you don’t have access to this. If this seems wrong, our support team is here to help!',
  404: "We can't seem to find the page you're looking for. Let's get you back home!",
  429: "You're moving super fast! But you need to slow down a bit. Please try again in a moment.",
  500: "Something went wrong on our end. Rest assured, we're working to fix it. Please try again shortly.",
  503: 'Our service is taking a quick breather. Please try again in a bit!',
};

const DEFAULT_ERROR_MESSAGE = "Something didn't go as planned, but we're on it! Try again soon.";

const createErrorMessage = (errorCode: number | undefined): string =>
  (errorCode && errorMessages[errorCode]) || DEFAULT_ERROR_MESSAGE;

export default createErrorMessage;
