import { createAction } from '@reduxjs/toolkit';

export const RenderTestActions = {
	setName: createAction<string>('renderTest/setName'),
	setDescription: createAction<string>('renderTest/setDescription'),
	setState: createAction<{ name: string; description: string }>('renderTest/setState')
};
