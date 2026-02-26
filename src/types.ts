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
  upcoming_events?: boolean;          // If true, show distinct inactive calendars
  days?: number;
  hours?: number;
  minutes?: number;
  max_minutes_until_start?: number; // Deprecated but kept for backwards compatibility

  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  
  unfold_events?: boolean;
  calendar_icon_color?: string; // CSS color for the top part of the calendar icon
  show_divider?: boolean; // Show divider between different calendars
  show_calendar_name?: boolean; // Show calendar name alongside time
  show_date?: boolean; // Show exact date instead of relative time
  dark_mode?: boolean; // Dark mode for calendar icons
  show_weekday?: boolean; // Show day of week abbreviation
  show_weekday_long?: boolean; // Show full day of week instead of short
  show_add_event?: boolean; // Show add event button
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
