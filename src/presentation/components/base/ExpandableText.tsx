import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import RNTextSize from 'react-native-text-size';

interface ExpandableTextProps {
  style: StyleProp<TextStyle>;
  numberOfLines: number;
  children: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  style,
  numberOfLines,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [maxLines, setMaxLines] = useState<number | undefined>(numberOfLines);

  useEffect(() => {
    const measureText = async () => {
      if (RNTextSize && children && style) {
        try {
          // Obtener fontSize y lineHeight del estilo aplastado
          const flattenedStyle = StyleSheet.flatten(style);
          const fontSize = flattenedStyle.fontSize || 14; // Valor predeterminado si fontSize no está definido
          const lineHeight = flattenedStyle.lineHeight || fontSize; // Usar fontSize si lineHeight no está definido

          const size = await RNTextSize.measure({
            text: children,
            width: flattenedStyle.width as number,
            fontSize: fontSize,
            fontFamily: flattenedStyle.fontFamily as string,
          });
          setIsTruncated(size.height > lineHeight * numberOfLines);
          if (size.height <= lineHeight * numberOfLines) {
            setMaxLines(undefined);
          }
        } catch (error) {
          console.error('Failed to measure text size', error);
        }
      }
    };

    measureText();
  }, [children, style, numberOfLines]);

  return (
    <View>
      <Text style={style} numberOfLines={isExpanded ? undefined : maxLines}>
        {children}
      </Text>
      {isTruncated && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.buttonText}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Archivo-Regular',
    fontSize: 14,
    color: '#553081',
    alignSelf: 'flex-end',
    marginHorizontal: 16,
  },
});

export default ExpandableText;
