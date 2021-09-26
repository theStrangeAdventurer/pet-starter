type CommonPageProps = { route: string; params: RouteParams; ssrData?: any };

type RouteParams = { [param: string]: string };

interface GetSSRProps {
  (params: RouteParams): Promise<any>;
}
