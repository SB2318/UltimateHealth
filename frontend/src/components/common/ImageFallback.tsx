 
import React, { useState } from 'react';
import { Image, ImageProps, ImageSource, ImageContentFit, ImageErrorEventData } from 'expo-image';
import { ImageSourcePropType } from 'react-native';

export interface ImageFallbackProps extends Omit<ImageProps, 'source' | 'resizeMode'> {
  source?: ImageSource | ImageSource[] | string | number | ImageSourcePropType | null;
  fallbackSource?: ImageSourcePropType | ImageSource;
  resizeMode?: ImageContentFit | 'cover' | 'contain' | 'stretch' | 'center' | 'fill' | 'repeat';
}

export const ImageFallback = ({ source, fallbackSource, style, resizeMode, ...props }: ImageFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  // Check if the primary source is a valid URI object, a local asset number, or a non-empty string
  const isPrimaryUriValid = 
    typeof source === 'number' || 
    (typeof source === 'string' && source.length > 0) ||
    (typeof source === 'object' && source !== null && 'uri' in source && typeof (source as { uri?: unknown }).uri === 'string' && (source as { uri: string }).uri.length > 0);

  // If the primary URI is invalid from the start, or an error occurred, use the fallback
  const finalSource = (!isPrimaryUriValid || hasError) ? (fallbackSource as ImageSource) : (source as ImageSource);

  let contentFit: ImageContentFit = props.contentFit || 'cover';
  if (resizeMode) {
    if (resizeMode === 'stretch') contentFit = 'fill';
    else if (resizeMode === 'center') contentFit = 'scale-down';
    else contentFit = resizeMode as ImageContentFit;
  }

  return (
    <Image
      source={finalSource}
      placeholder={fallbackSource as ImageSource}
      cachePolicy="disk"
      transition={150}
      contentFit={contentFit}
      onError={(e: ImageErrorEventData) => {
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