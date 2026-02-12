import { ActionConfig, LovelaceCardConfig } from './ha/types';

export interface CalendarCardPlusConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  debug?: boolean;
  
  // Calendar specific
  exclude_entities?: string[]; // If undefined or empty, check all calendars. If present, exclude these.
  show_all?: boolean;          // If true, show distinct inactive calendars
  max_minutes_until_start?: number; // How many minutes into the future to look for upcoming events. Default 60.

  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  
  display_mode?: DisplayMode; // 'list' | 'compact'
}

export type DisplayMode = 'list' | 'compact';

export interface CalendarEvent {
    start: { date?: string; dateTime?: string };
    end: { date?: string; dateTime?: string };
    summary: string;
    description?: string;
    location?: string;
    uid?: string;
    recurrence_id?: string;
    rrule?: string;
    
    // Augmented properties
    entity_id: string;
    calendar_name: string;
}
