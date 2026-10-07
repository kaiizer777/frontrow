import { ChatMessage } from './types';

export const initialRoomMessages: Record<string, ChatMessage[]> = {
  'room-vintage-tone': [
    {
      id: 'msg-vt-1',
      roomId: 'room-vintage-tone',
      sender: {
        id: 'inst-marcus-vance',
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        badge: 'Mentor',
      },
      content: 'Hey everyone! Remember for this week’s neo-soul challenge: back off your pickup volume to around 7 to let the amplifier breathe naturally. Less gain = more dynamics!',
      timestamp: 'Today at 10:15 AM',
      reactions: [
        { emoji: '🔥', count: 8, userReacted: true },
        { emoji: '🎸', count: 12, userReacted: true },
      ],
    },
    {
      id: 'msg-vt-2',
      roomId: 'room-vintage-tone',
      sender: {
        id: 'user-alex',
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        badge: 'Moderator',
      },
      content: 'Tested that on my 65 Princeton Reverb reissue with an optical compressor in front. The transient attack on double stops is so buttery now.',
      timestamp: 'Today at 10:42 AM',
      reactions: [{ emoji: '🙌', count: 4, userReacted: false }],
    },
    {
      id: 'msg-vt-3',
      roomId: 'room-vintage-tone',
      sender: {
        id: 'user-saif',
        name: 'Saif B.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        isCurrentUser: true,
      },
      content: 'Just finished Module 2 on grace note hammer-ons! Practicing transitioning between a Maj9 voicing and min11 with the thumb-over bass. Feeling the groove click.',
      timestamp: 'Today at 11:20 AM',
      reactions: [
        { emoji: '👏', count: 6, userReacted: false },
        { emoji: '✨', count: 3, userReacted: false },
      ],
    },
    {
      id: 'msg-vt-4',
      roomId: 'room-vintage-tone',
      sender: {
        id: 'user-alex',
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        badge: 'Moderator',
      },
      content: 'Anyone tried running a Klon-style transparent drive into a cranked tube amp? Looking for recommendations for low noise floor pedals.',
      timestamp: '3m ago',
      reactions: [{ emoji: '💡', count: 2, userReacted: false }],
    },
  ],
  'room-aeropress': [
    {
      id: 'msg-ap-1',
      roomId: 'room-aeropress',
      sender: {
        id: 'inst-elena-rostova',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        badge: 'Q-Grader Mentor',
      },
      content: 'Good morning brewers! When tasting an anaerobic natural, look for candied stone fruits like apricot and peach in the middle cooling stage.',
      timestamp: 'Today at 8:30 AM',
      reactions: [{ emoji: '☕', count: 14, userReacted: true }],
    },
    {
      id: 'msg-ap-2',
      roomId: 'room-aeropress',
      sender: {
        id: 'user-chloe',
        name: 'Chloe Adams',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        badge: 'Moderator',
      },
      content: 'Try 91°C water with 50ppm hardness, the floral jasmine notes explode. Dropped my total drawdown time to 2:45.',
      timestamp: '12m ago',
      reactions: [{ emoji: '❤️', count: 5, userReacted: false }],
    },
  ],
  'room-leica-street': [
    {
      id: 'msg-ls-1',
      roomId: 'room-leica-street',
      sender: {
        id: 'inst-kai-takahashi',
        name: 'Kai Takahashi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        badge: 'Mentor',
      },
      content: 'Street tip: Preset your focus ring to 2.5 meters at f/8. You never need to look through the viewfinder to catch a passing character.',
      timestamp: 'Yesterday at 4:10 PM',
      reactions: [{ emoji: '📸', count: 19, userReacted: true }],
    },
    {
      id: 'msg-ls-2',
      roomId: 'room-leica-street',
      sender: {
        id: 'user-jin',
        name: 'Jin Woo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        badge: 'Moderator',
      },
      content: 'Shot on HP5 pushed to 800 in Shinjuku during drizzle. The grain has so much soul.',
      timestamp: '24m ago',
      reactions: [{ emoji: '🔥', count: 7, userReacted: false }],
    },
  ],
  'room-ceramic-wheel': [
    {
      id: 'msg-cw-1',
      roomId: 'room-ceramic-wheel',
      sender: {
        id: 'user-maya',
        name: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      },
      content: 'Finally centered 2.5kg of stoneware without throwing my lower back out! Keeping the left elbow tucked firmly against the hip bone made all the difference.',
      timestamp: '1h ago',
      reactions: [{ emoji: '🎉', count: 9, userReacted: true }],
    },
  ],
  'room-procreate-art': [
    {
      id: 'msg-pa-1',
      roomId: 'room-procreate-art',
      sender: {
        id: 'inst-sora-matsuda',
        name: 'Sora Matsuda',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        badge: 'Mentor',
      },
      content: 'Loving the bounce light on the jacket edge in that concept piece. Try shifting the shadow color from neutral grey to a cool indigo for contrast.',
      timestamp: '45m ago',
      reactions: [{ emoji: '🎨', count: 11, userReacted: true }],
    },
  ],
  'room-japan-joinery': [
    {
      id: 'msg-jj-1',
      roomId: 'room-japan-joinery',
      sender: {
        id: 'inst-hiro-tanaka',
        name: 'Hiro Tanaka',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        badge: 'Master Craftsman',
      },
      content: 'Cut a snug Kanawa-tsugi joint on hinoki cypress. Friction holds it like rock.',
      timestamp: '2h ago',
      reactions: [{ emoji: '🪵', count: 6, userReacted: true }],
    },
  ],
};
