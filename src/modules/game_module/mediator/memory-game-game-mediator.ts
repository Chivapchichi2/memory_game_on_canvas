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
import { gsap } from 'gsap';
import { MemoryGameGameView } from '../view/memory-game-game-view';
import { MemoryGameGameProxy } from '../proxy/memory-game-game-proxy';
import { MemoryGameUiMediator } from '../../ui_module/mediator/memory-game-ui-mediator';
import { MemoryGameUiNames } from '../../ui_module/misc/memory-game-ui-names';

export class MemoryGameGameMediator {
	protected view: MemoryGameGameView;
	protected proxy: MemoryGameGameProxy;
	protected uiMediator: MemoryGameUiMediator;
	protected level: string;
	public canvas: HTMLCanvasElement;

	constructor(level: string, canvas: HTMLCanvasElement, mediator: MemoryGameUiMediator) {
		this.level = level;
		this.canvas = canvas;
		this.view = new MemoryGameGameView(level, this.canvas);
		this.proxy = new MemoryGameGameProxy(level);
		this.canvas.onclick = this.onCanvasClick.bind(this);
		this.uiMediator = mediator;
	}
	public startGame(): void {
		this.view.start();
	}
	public resetGame(): void {
		this.view = new MemoryGameGameView(this.level, this.canvas);
		this.proxy = new MemoryGameGameProxy(this.level);
		this.canvas.onclick = this.onCanvasClick.bind(this);
		this.uiMediator.startGame();
	}
	public onCanvasClick(e: MouseEvent): void {
		const index = this.view.onCanvasClick(e);
		if (index > -1) {
			this.proxy.setIndexToPool(index);
			this.proxy.turnedCards = 1;
			if (this.proxy.activeCardIndexPool.length === 2) {
				const previousIndex = this.proxy.getIndexFromPool();
				this.proxy.resetPool();
				const pair = this.view.checkAndFlipCard(previousIndex, index);
				if (!this.proxy.subtractPairLeft(pair)) {
					gsap.delayedCall(3, () => {
						this.sendMessage(this.calculateScore());
						gsap.delayedCall(5, () => {
							this.resetGame();
						});
					});
				}
			}
		}
	}
	protected calculateScore(): number {
		let score: number;
		if (this.level === MemoryGameUiNames.EASY_LEVEL) {
			score = Math.round((24 / this.proxy.turnedCards) * 100);
		}
		if (this.level === MemoryGameUiNames.NORMAL_LEVEL) {
			score = Math.round((48 / this.proxy.turnedCards) * 100);
		}
		if (this.level === MemoryGameUiNames.HARD_LEVEL) {
			score = Math.round((96 / this.proxy.turnedCards) * 100);
		}
		if (score > 100) score = 100;
		return score;
	}

	protected sendMessage(score: number): void {
		let message = '';
		if (score === 100) {
			message = 'Good, your score is 100';
			this.canvas.getContext('2d').fillStyle = 'green';
		}
		if (score < 100 && score > 50) {
			message = `Not bad, your score is ${score}`;
			this.canvas.getContext('2d').fillStyle = 'yellow';
		}
		if (score < 50) {
			message = `Eeee ok, your score is ${score}`;
			this.canvas.getContext('2d').fillStyle = 'red';
		}
		this.uiMediator.endGameScreenShow(message);
	}
}
