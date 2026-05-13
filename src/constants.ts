/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  cover: string;
  placeholderColor: string;
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Electric Dreams',
    artist: 'AI Synthwave',
    duration: 184,
    cover: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=300&h=300&fit=crop',
    placeholderColor: 'bg-pink-500',
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Neural Tech',
    duration: 212,
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop',
    placeholderColor: 'bg-cyan-500',
  },
  {
    id: '3',
    title: 'Neon Nights',
    artist: 'Vapor Wave',
    duration: 156,
    cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=300&fit=crop',
    placeholderColor: 'bg-purple-500',
  },
];
