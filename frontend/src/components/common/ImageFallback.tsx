 
// @ts-nocheck
import React, { useState } from 'react';
import { Image, ImageProps } from 'expo-image';
import { ImageSourcePropType } from 'react-native';

interface ImageFallbackProps extends Omit<ImageProps, 'source'> {
  source: any;
  fallbackSource?: ImageSourcePropType;
  resizeMode?: any;
}

export const ImageFallback = ({ source, fallbackSource, style, resizeMode, ...props }: ImageFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  // Check if the primary source is a valid URI object, or a valid local file (number)
  const isPrimaryUriValid = 
    typeof source === 'number' || 
    (typeof source === 'object' && source !== null && 'uri' in source && typeof (source as any).uri === 'string' && (source as any).uri.length > 0);

  // If the primary URI is invalid from the start, or an error occurred, use the fallback
  const finalSource = (!isPrimaryUriValid || hasError) ? fallbackSource : source;

  const contentFit = props.contentFit || (resizeMode as any) || 'cover';

  return (
    <Image
      source={finalSource}
      placeholder={fallbackSource}
      cachePolicy="disk"
      transition={150}
      contentFit={contentFit}
      onError={(e: any) => {
        // Only trigger our error state if the original URI was theoretically valid
        if (isPrimaryUriValid) {
          setHasError(true);
        }
        // If an onError prop was passed in from the parent, make sure we still call it!
        if (props.onError) {
          props.onError(e);
        }
      }}
      style={style}
      {...props}
    />
  );
};