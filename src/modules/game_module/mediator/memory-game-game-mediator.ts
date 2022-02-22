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

export class MemoryGameGameMediator {
	protected view: MemoryGameGameView;
	protected proxy: MemoryGameGameProxy;
	protected level: string;
	public canvas: HTMLCanvasElement;

	constructor(level: string) {
		this.level = level;
		this.view = new MemoryGameGameView(level);
		this.proxy = new MemoryGameGameProxy(level);
		this.canvas = this.view.canvas;
		this.canvas.onclick = this.onCanvasClick.bind(this);
	}
	public startGame(): void {
		this.view.start();
	}
	public resetGame(): void {
		this.view = new MemoryGameGameView(this.level);
		this.proxy = new MemoryGameGameProxy(this.level);
		this.canvas = this.view.canvas;
		this.canvas.onclick = this.onCanvasClick.bind(this);
		this.startGame();
	}
	public onCanvasClick(e: MouseEvent): void {
		const index = this.view.onCanvasClick(e);
		if (index > -1) {
			this.proxy.setIndexToPool(index);
			if (this.proxy.activeCardIndexPool.length === 2) {
				const previousIndex = this.proxy.getIndexFromPool();
				this.proxy.resetPool();
				const pair = this.view.checkAndFlipCard(previousIndex, index);
				if (!this.proxy.subtractPairLeft(pair)) {
					gsap.delayedCall(3, () => {
						this.resetGame();
					});
				}
			}
		}
	}
}
