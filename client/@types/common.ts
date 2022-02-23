type CommonPageProps = {
  isMobile: boolean;
  userAgent: string;
  ssrData?: any
};

type RouteParams = { [param: string]: string };

interface GetSSRProps {
  (params: RouteParams): Promise<any>;
}
