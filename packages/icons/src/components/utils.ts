import ArrowUp from './arrow-up.component';
import ArrowDown from './arrow-down.component';
import CaretLeft from './caret-left.component';
import CaretRight from './caret-right.component';
import CaretUp from './caret-up.component';
import CaretDown from './caret-down.component';
import Brand from './brand.component';
import QuestionMark from './question-mark.component';
import EyeSolid from './eye-solid.component';
import EyeOutline from './eye-outline.component';
import EyeSlashSolid from './eye-slash-solid.component';
import UserSolid from './user-solid.component';
import UserOutline from './user-outline.component';
import UsersSolid from './users-solid.component';
import UsersOutline from './users-outline.component';
import ClickSolid from './click-solid.component';
import ClickOutline from './click-outline.component';
import CursorSolid from './cursor-solid.component';
import CursorOutline from './cursor-outline.component';
import Check from './check.component';
import Line from './line.component';

import { IconType } from '../types';

export const getIcon = (type: IconType) => {
  switch (type) {
    case 'arrow-down':
      return ArrowDown;
    case 'arrow-up':
      return ArrowUp;
    case 'caret-down':
      return CaretDown;
    case 'caret-up':
      return CaretUp;
    case 'caret-left':
      return CaretLeft;
    case 'caret-right':
      return CaretRight;
    case 'check':
      return Check;
    case 'line':
      return Line;
    case 'brand':
      return Brand;
    case 'question-mark':
      return QuestionMark;
    case 'click-solid':
      return ClickSolid;
    case 'click-outline':
      return ClickOutline;
    case 'cursor-solid':
      return CursorSolid;
    case 'cursor-outline':
      return CursorOutline;
    case 'eye-solid':
      return EyeSolid;
    case 'eye-outline':
      return EyeOutline;
    case 'eye-slash-solid':
      return EyeSlashSolid;
    case 'user-solid':
      return UserSolid;
    case 'user-outline':
      return UserOutline;
    case 'users-solid':
      return UsersSolid;
    case 'users-outline':
      return UsersOutline;
  }
};
