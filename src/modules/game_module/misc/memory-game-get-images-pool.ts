import { MemoryGameUiNames } from '../../ui_module/misc/memory-game-ui-names';

/**
 * iSOFTBET
 * Copyright 2022 iSOFTBET
 * All Rights Reserved.
 *
 * NOTICE: You may not use, distribute or modify this document without the
 * written permission of its copyright owner
 *
 * Created by Pavlo Ivchenko on 21.02.2022
 */

export class MemoryGameGetImagesPool {
	protected level: string;
	constructor(level: string) {
		this.level = level;
	}
	protected imagesNamePool: string[] = [
		'./assets/american-shorthair-kitten.jpg',
		'./assets/blue-eye-cat.jpg',
		'./assets/british-shorthair.jpg',
		'./assets/cat-edit.jpg',
		'./assets/cat-laying-down.jpg',
		'./assets/cat-waiting.jpg',
		'./assets/clean-cat.jpg',
		'./assets/fat-cat.jpg',
		'./assets/fat-tiger-cat.jpg',
		'./assets/fury-cat.jpg',
		'./assets/green-cat.jpg',
		'./assets/green-eyed-cat.jpg',
		'./assets/kanzeon-cats.jpg',
		'./assets/kitten.jpg',
		'./assets/koshka-babochka.jpg',
		'./assets/lazy-black-cat.jpg',
		'./assets/linda.jpeg',
		'./assets/new-year.jpg',
		'./assets/on-back-cat.jpg',
		'./assets/red-cat.jpg',
		'./assets/shurochka.jpeg',
		'./assets/vytyanulas.jpg',
		'./assets/white-cat.jpg',
		'./assets/winter-cat-in-snow.jpg'
	];
	protected getRandomIntInclusive(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	public getRandomPool(): string[] {
		let numberOfImages: number;
		const result: string[] = [];
		if (this.level === MemoryGameUiNames.EASY_LEVEL) numberOfImages = 12;
		if (this.level === MemoryGameUiNames.NORMAL_LEVEL) numberOfImages = 24;
		if (this.level === MemoryGameUiNames.HARD_LEVEL) numberOfImages = 48;
		const copyPool: string[] = this.imagesNamePool
			.slice(0, numberOfImages / 2)
			.concat(this.imagesNamePool.slice(0, numberOfImages / 2));

		for (let i = 0; i <= numberOfImages; i++) {
			const index = this.getRandomIntInclusive(0, copyPool.length - 1);
			result.push(...copyPool.splice(index, 1));
		}
		return result;
	}
}
