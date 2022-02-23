/**
 * iSOFTBET
 * Copyright 2022 iSOFTBET
 * All Rights Reserved.
 *
 * NOTICE: You may not use, distribute or modify this document without the
 * written permission of its copyright owner
 *
 * Created by Pavlo Ivchenko on 18.02.2022
 */
import './styles.scss';

import { MemoryGameUiMediator } from './modules/ui_module/mediator/memory-game-ui-mediator';
const ui = new MemoryGameUiMediator();
ui.startGame();
