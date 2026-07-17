import EmojiPicker from "emoji-picker-react";

const ReactionPicker = ({
  onSelect,
}) => {
  return (
    <div
      className="
        absolute
        bottom-full
        right-0
        mb-3
        z-50
      "
    >
      <EmojiPicker
        theme="dark"
        width={320}
        height={380}
        skinTonesDisabled
        lazyLoadEmojis
        onEmojiClick={(emoji) =>
          onSelect(emoji.emoji)
        }
      />
    </div>
  );
};

export default ReactionPicker;