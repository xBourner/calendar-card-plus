import { ActionConfig, LovelaceCardConfig } from './ha/types';

export interface CalendarCardPlusConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  debug?: boolean;
  
  
  exclude_entities?: string[];
  upcoming_events?: boolean;
  days?: number;
  hours?: number;
  minutes?: number;
  max_minutes_until_start?: number;

  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  
  unfold_events?: boolean;
  calendar_icon_color?: string;
  show_divider?: boolean;
  show_calendar_name?: boolean;
  show_date?: boolean;
  dark_mode?: boolean;
  show_weekday?: boolean;
  show_weekday_long?: boolean;
  show_add_event?: boolean;
}

export interface CalendarEvent {
    start: { date?: string; dateTime?: string };
    end: { date?: string; dateTime?: string };
    summary: string;
    description?: string;
    location?: string;
    uid?: string;
    recurrence_id?: string;
    rrule?: string;
    
    entity_id: string;
    calendar_name: string;
}
