import { createAction, props } from "@ngrx/store";

/* MENU IDENTIFIERS */

const MOBILE_MENU_OPENED = '[UI] MOBILE_MENU_OPENED';
const MOBILE_MENU_CLOSED = '[UI] MOBILE_MENU_CLOSED';

/* MOBILE MENU ACTIONS */

const MobileMenuOpened = createAction(MOBILE_MENU_OPENED);
const MobileMenuClosed = createAction(MOBILE_MENU_CLOSED);

export const LayoutActions = {
  MobileMenuOpened,
  MobileMenuClosed,
};
