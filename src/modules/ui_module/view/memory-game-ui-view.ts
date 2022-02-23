/**
 * iSOFTBET
 * Copyright 2022 iSOFTBET
 * All Rights Reserved.
 *
 * NOTICE: You may not use, distribute or modify this document without the
 * written permission of its copyright owner
 *
 * Created by Pavlo Ivchenko on 22.02.2022
 */
import { roundedRect } from '../../game_module/misc/memory-game-rounded-rectangle';
import { MemoryGameGameNames } from '../../game_module/misc/memory-game-game-names';
import { MemoryGameUiNames } from '../misc/memory-game-ui-names';

export class MemoryGameUiView {
	protected _canvas: HTMLCanvasElement;
	protected ctx: CanvasRenderingContext2D;
	protected colors: string[] = ['green', 'yellow', 'red'];
	protected level: string[] = ['Easy Level', 'Normal Level', 'Hard Level'];
	constructor() {
		this._canvas = document.createElement('canvas') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this._canvas.textContent = 'Sorry, game not work :(';
		this._canvas.setAttribute('width', `${window.screen.width}`);
		this._canvas.setAttribute('height', `${window.screen.height}`);
		this._canvas.setAttribute('id', 'canvas');
		document.body.appendChild(this.canvas);
	}

	public get canvas(): HTMLCanvasElement {
		return this._canvas;
	}

	public start(): void {
		for (let i = 0; i < 3; i++) {
			this.ctx.resetTransform();
			this.ctx.translate(window.screen.width / 4, window.screen.height / 2 + 100 * i);
			this.drawBtn(i);
		}
		this.ctx.resetTransform();
		this.ctx.fillStyle = MemoryGameUiNames.BACKGROUND_COLOR;
		this.ctx.globalCompositeOperation = MemoryGameGameNames.OVERLAY;
		this.ctx.fillRect(0, 0, window.screen.width, window.screen.height);
	}
	public drawBtn(index: number): void {
		roundedRect(this.ctx, 0, 0, window.screen.width / 2, 60, 20);
		this.ctx.globalCompositeOperation = MemoryGameGameNames.SOURCE_A_TOP;
		this.ctx.fillStyle = this.colors[index];
		this.ctx.fillRect(0, 0, window.screen.width / 2, 60);
		this.ctx.globalCompositeOperation = MemoryGameGameNames.SOURCE_OVER;
		this.ctx.fillStyle = 'darkBlue';
		this.ctx.font = '50px serif';
		this.ctx.fillText(this.level[index], window.screen.width / 6, 45);
	}
}
