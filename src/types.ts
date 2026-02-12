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
  
  multiple_events?: boolean;
  calendar_icon_color?: string; // CSS color for the top part of the calendar icon
  calendar_colors?: Record<string, string>; // Map of entity_id to CSS color
  show_calendar_divider?: boolean; // Show divider between different calendars
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
    
    // Augmented properties
    entity_id: string;
    calendar_name: string;
}
