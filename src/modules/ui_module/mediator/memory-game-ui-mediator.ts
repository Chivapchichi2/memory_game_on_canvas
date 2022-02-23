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
import { MemoryGameUiView } from '../view/memory-game-ui-view';
import { MemoryGameGameMediator } from '../../game_module/mediator/memory-game-game-mediator';
import { MemoryGameUiNames } from '../misc/memory-game-ui-names';
import { MemoryGameUiEndGameView } from '../view/memory-game-ui-end-game-view';

export class MemoryGameUiMediator {
	protected view: MemoryGameUiView;
	protected endGameView: MemoryGameUiEndGameView;
	protected gameModuleMediator: MemoryGameGameMediator;
	protected ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;

	constructor() {
		this.view = new MemoryGameUiView();
		this.canvas = this.view.canvas;
		this.ctx = this.canvas.getContext('2d');
	}
	public startGame(): void {
		this.ctx.resetTransform();
		this.ctx.clearRect(0, 0, window.screen.width, window.screen.height);
		this.view.start();
		this.canvas.onclick = this.onBtnClick.bind(this);
	}
	protected onBtnClick(e: MouseEvent): void {
		if (e.x > window.screen.width / 4 && e.x < (window.screen.width * 3) / 4) {
			if (e.y > window.screen.height / 2 && e.y < window.screen.height / 2 + 60) {
				this.gameModuleMediator = new MemoryGameGameMediator(MemoryGameUiNames.EASY_LEVEL, this.canvas, this);
				this.gameModuleMediator.startGame();
			}
			if (e.y > window.screen.height / 2 + 100 && e.y < window.screen.height / 2 + 160) {
				this.gameModuleMediator = new MemoryGameGameMediator(MemoryGameUiNames.NORMAL_LEVEL, this.canvas, this);
				this.gameModuleMediator.startGame();
			}
			if (e.y > window.screen.height / 2 + 200 && e.y < window.screen.height / 2 + 260) {
				this.gameModuleMediator = new MemoryGameGameMediator(MemoryGameUiNames.HARD_LEVEL, this.canvas, this);
				this.gameModuleMediator.startGame();
			}
		}
	}
	public endGameScreenShow(message: string): void {
		this.endGameView = new MemoryGameUiEndGameView(message, this.ctx);
		this.endGameView.drawEndGame();
	}
}
