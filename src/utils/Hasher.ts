import argon from 'argon2';

export const hashString = async (text: string): Promise<string> => await argon.hash(text);


