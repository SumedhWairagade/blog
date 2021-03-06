// @flow
import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('GA init');
  ReactGA.initialize(process.env.ANALYTICS);
};

export const logPageView = () => {
  const { pathname } = window.location;
  console.log(`Logging pageview for ${pathname}`);
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
};

type logEventTypes = {|
  category: string,
  action: string,
|};

export const logEvent = ({ category, action }: logEventTypes) => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

type logExceptionTypes = {|
  description: string,
  fatal?: boolean,
|};

export const logException = ({
  description,
  fatal = false,
}: logExceptionTypes) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
