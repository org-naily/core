export interface NWebExpAdapterRequestChangeOptions {
  request: any;
  params: any;
  query: any;
  body: any;
}

export interface NWebExpAdapterHandlerOptions extends NWebExpAdapterRequestChangeOptions {
  response: any;
  next: Function;
  cookies: any;
  headers: any;
  ip: string;
}
