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
import * as _ from 'lodash';
import { gsap } from 'gsap';
import { MemoryGameOneCard } from './memory-game-one-card';
import { MemoryGameGetImagesPool } from '../misc/memory-game-get-images-pool';
import { MemoryGameUiNames } from '../../ui_module/misc/memory-game-ui-names';

export class MemoryGameGameView {
	protected level: string;
	protected canvas: HTMLCanvasElement;
	protected ctx: CanvasRenderingContext2D;
	protected poolOfCards: MemoryGameOneCard[] = [];
	protected poolOfImagesName: string[];
	protected columns: number;
	protected rows: number;

	constructor(level: string, canvas: HTMLCanvasElement) {
		this.level = level;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');

		if (this.level === MemoryGameUiNames.EASY_LEVEL) {
			this.columns = 4;
			this.rows = 3;
		}
		if (this.level === MemoryGameUiNames.NORMAL_LEVEL) {
			this.columns = 6;
			this.rows = 4;
		}
		if (this.level === MemoryGameUiNames.HARD_LEVEL) {
			this.columns = 8;
			this.rows = 6;
		}

		const imagePool: MemoryGameGetImagesPool = new MemoryGameGetImagesPool(level);
		this.poolOfImagesName = imagePool.getRandomPool();
		_.each(this.poolOfImagesName, (imageName) => {
			this.poolOfCards.push(new MemoryGameOneCard(imageName, level));
		});
	}

	public start(): void {
		this.ctx.resetTransform();
		this.ctx.clearRect(0, 0, window.screen.width, window.screen.height);
		let index = 0;
		for (let i = 0; i < this.columns; i++) {
			for (let j = 0; j < this.rows; j++) {
				this.ctx.resetTransform();
				this.ctx.translate(
					50 + i * (this.poolOfCards[0].width + 15),
					3 + j * (this.poolOfCards[0].height + 15)
				);
				this.poolOfCards[index].draw(this.ctx);
				index++;
			}
		}
	}
	public onCanvasClick(e: MouseEvent): number {
		let index = -1;
		_.each(this.poolOfCards, (el, i) => {
			if (
				el.matrix.e < e.x + 30 &&
				el.matrix.e + el.width > e.x + 30 &&
				el.matrix.f < e.y &&
				el.matrix.f + el.height > e.y &&
				el.a === -1
			) {
				index = i;
				el.flip();
			}
		});
		return index;
	}
	public checkAndFlipCard(i: number, j: number): number {
		if (this.poolOfCards[i].imgSrc === this.poolOfCards[j].imgSrc) {
			return 1;
		}
		gsap.delayedCall(1.5, () => {
			this.poolOfCards[i].flip();
			this.poolOfCards[j].flip();
		});
		return 0;
	}
}
