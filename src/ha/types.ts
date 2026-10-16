
export interface HomeAssistant {
  states: { [entity_id: string]: any };
  user: any;
  callService: (domain: string, service: string, serviceData?: object) => Promise<void>;
  callApi: (method: string, path: string, parameters?: object) => Promise<any>;
  fetchWithAuth: (path: string, init?: object) => Promise<Response>;
  sendWS: (msg: object) => Promise<void>;
  callWS: (msg: object) => Promise<any>;
  auth: any;
  connection: any;
  locale: any;
  config: any;
  areas: any;
  devices: any;
  entities: any;
  [key: string]: any;
}

export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  view_layout?: any;
  type: string;
  [key: string]: any;
}

export interface LovelaceCardEditor extends HTMLElement {
  setConfig(config: LovelaceCardConfig): void;
}

