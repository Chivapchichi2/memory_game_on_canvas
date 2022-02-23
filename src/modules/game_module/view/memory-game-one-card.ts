/**
 * iSOFTBET
 * Copyright 2020 iSOFTBET
 * All Rights Reserved.
 *
 * NOTICE: You may not use, distribute or modify this document without the
 * written permission of its copyright owner
 *
 * Created by Pavlo Ivchenko on 18.02.2020
 */
import { roundedRect } from '../misc/memory-game-rounded-rectangle';
import { MemoryGameUiNames } from '../../ui_module/misc/memory-game-ui-names';
import { MemoryGameGameNames } from '../misc/memory-game-game-names';

export class MemoryGameOneCard {
	protected img: HTMLImageElement;
	protected ctx: CanvasRenderingContext2D;
	public matrix: DOMMatrix;
	public imgSrc: string;
	public width: number;
	public height: number;
	public a: number;
	public b: number;
	public e: number;
	public d: number;
	public f: number;
	public frontSide: boolean;
	public forward: boolean;

	constructor(img: string, level: string) {
		this.imgSrc = img;
		if (level === MemoryGameUiNames.EASY_LEVEL) {
			this.width = (window.screen.width - 368) / 4;
			this.height = (window.screen.height - 207) / 3;
		} else if (level === MemoryGameUiNames.NORMAL_LEVEL) {
			this.width = (window.screen.width - 360) / 6;
			this.height = (window.screen.height - 202.5) / 4.5;
		} else {
			this.width = (window.screen.width - 448) / 8;
			this.height = (window.screen.height - 252) / 6;
		}
		this.a = -1;
		this.b = -3.120502056758253e-17;
		this.e = this.width;
		this.d = 1;
		this.f = 0;
		this.frontSide = false;
		this.forward = false;
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		this.ctx = ctx;
		this.matrix = ctx.getTransform();
		this.e += this.matrix.e;
		this.f += this.matrix.f;
		this.img = new Image();
		this.img.src = this.imgSrc;
		this.img.src = MemoryGameGameNames.TEXTURE;
		this.img.addEventListener('load', () => {
			this.ctx.setTransform(this.matrix);
			this.ctx.globalCompositeOperation = MemoryGameGameNames.SOURCE_OVER;
			roundedRect(this.ctx, 0, 0, this.width, this.height, 20);
			this.ctx.globalCompositeOperation = MemoryGameGameNames.SOURCE_A_TOP;
			this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
		});
	}

	public flip(): void {
		if (this.forward) {
			if (this.a - 1 / 30 < 0) {
				this.frontSide = false;
			}
			if (this.frontSide) {
				this.a -= 1 / 30;
				this.b += 0.01;
				this.e += this.width / 60;
				this.d -= 0.016;
				this.f -= 0.12;
			} else {
				this.a -= 1 / 30;
				if (this.a - 1 / 30 < -1) this.a = -1;
				this.b -= 0.01;
				this.e += this.width / 60;
				this.d += 0.016;
				this.f += 0.12;
			}
		} else {
			if (this.a + 1 / 30 > 0) {
				this.frontSide = true;
			}
			if (this.frontSide) {
				this.a += 1 / 30;
				if (this.a + 1 / 30 > 1) this.a = 1;
				this.b -= 0.01;
				this.e -= this.width / 60;
				this.d += 0.016;
				this.f += 0.12;
			} else {
				this.a += 1 / 30;
				this.b += 0.01;
				this.e -= this.width / 60;
				this.d -= 0.016;
				this.f -= 0.12;
			}
		}
		this.ctx.resetTransform();
		this.ctx.clearRect(this.matrix.e - 5, this.matrix.f - 5, this.width + 10, this.height + 10);
		this.ctx.setTransform(this.a, this.b, 0, this.d, this.e, this.f);
		this.ctx.globalCompositeOperation = MemoryGameGameNames.SOURCE_OVER;
		roundedRect(this.ctx, 0, 0, this.width, this.height, 20);
		this.ctx.globalCompositeOperation = MemoryGameGameNames.SOURCE_A_TOP;

		if (this.frontSide) {
			this.img.src = this.imgSrc;
		} else {
			this.img.src = MemoryGameGameNames.TEXTURE;
		}
		this.ctx.drawImage(this.img, 0, 0, this.width, this.height);

		if (this.a === 1) {
			this.forward = true;
			return;
		}

		if (this.a === -1) {
			this.forward = false;
			return;
		}

		requestAnimationFrame(this.flip.bind(this));
	}
}
