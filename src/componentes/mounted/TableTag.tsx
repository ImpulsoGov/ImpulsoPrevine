import { Tag, Icon, Text } from '@impulsogov/design-system';

export type TagTheme = 'danger' | 'warning' | 'success' | 'pending';

export interface TableTagProps {
  theme?: TagTheme;
  text: string;
  icon: {
    src: string;
    alt: string;
  };
}

export const TableTag = ({
  theme = 'danger',
  text,
  icon: { src, alt }
}: TableTagProps) => {
  return (
    <Tag theme={theme}>
      <Icon
        width={12}
        height={12}
        src={src}
        alt={alt}
      />
      <Text>{text}</Text>
    </Tag>
  );
}
