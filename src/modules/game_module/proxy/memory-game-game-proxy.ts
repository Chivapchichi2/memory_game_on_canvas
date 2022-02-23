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
import { MemoryGameUiNames } from '../../ui_module/misc/memory-game-ui-names';

export class MemoryGameGameProxy {
	protected level: string;
	protected _turnedCards: number;
	public activeCardIndexPool: number[];
	public pairLeft: number;
	constructor(level: string) {
		this.level = level;
		this.activeCardIndexPool = [];
		if (this.level === MemoryGameUiNames.EASY_LEVEL) this.pairLeft = 6;
		if (this.level === MemoryGameUiNames.NORMAL_LEVEL) this.pairLeft = 12;
		if (this.level === MemoryGameUiNames.HARD_LEVEL) this.pairLeft = 24;
		this._turnedCards = 0;
	}
	public setIndexToPool(index: number): void {
		this.activeCardIndexPool.push(index);
	}
	public resetPool(): void {
		this.activeCardIndexPool = [];
	}
	public getIndexFromPool(): number {
		return this.activeCardIndexPool[0];
	}
	public subtractPairLeft(a: number): number {
		this.pairLeft -= a;
		return this.pairLeft;
	}
	public set turnedCards(x: number) {
		this._turnedCards += x;
	}
	public get turnedCards(): number {
		return this._turnedCards;
	}
}
