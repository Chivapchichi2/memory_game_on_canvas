import { MemoryGameGameNames } from '../../game_module/misc/memory-game-game-names';
import { MemoryGameUiNames } from '../misc/memory-game-ui-names';

/**
 * iSOFTBET
 * Copyright 2022 iSOFTBET
 * All Rights Reserved.
 *
 * NOTICE: You may not use, distribute or modify this document without the
 * written permission of its copyright owner
 *
 * Created by Pavlo Ivchenko on 23.02.2022
 */

export class MemoryGameUiEndGameView {
	protected massage: string;
	protected ctx: CanvasRenderingContext2D;
	constructor(message: string, ctx: CanvasRenderingContext2D) {
		this.massage = message;
		this.ctx = ctx;
	}
	public drawEndGame(): void {
		this.ctx.resetTransform();
		this.ctx.globalCompositeOperation = MemoryGameGameNames.SOURCE_OVER;
		this.ctx.clearRect(0, 0, window.screen.width, window.screen.height);
		this.ctx.font = '60px serif';
		this.ctx.fillText(this.massage, window.screen.width / 3, window.screen.height / 3);
		this.ctx.fillStyle = MemoryGameUiNames.BACKGROUND_COLOR;
		this.ctx.globalCompositeOperation = MemoryGameGameNames.OVERLAY;
		this.ctx.fillRect(0, 0, window.screen.width, window.screen.height);
	}
}
