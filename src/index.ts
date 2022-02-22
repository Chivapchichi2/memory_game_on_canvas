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
import { MemoryGameGameMediator } from './modules/game_module/mediator/memory-game-game-mediator';
import { MemoryGameUiNames } from './modules/ui_module/misc/memory-game-ui-names';

const game: MemoryGameGameMediator = new MemoryGameGameMediator(MemoryGameUiNames.EASY_LEVEL) as MemoryGameGameMediator;

game.startGame();
