import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import PodcastDetailClient from '@/components/podcasts/PodcastDetailClient';
import {
  fetchPodcastById,
  fetchPublishedPodcasts,
  fetchPodcastEpisodes,
} from '@/lib/podcast-api';
import {
  BRAND_NAME,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  buildBreadcrumbJsonLd,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export const revalidate = 180;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const podcast = await fetchPodcastById(id);

  if (!podcast) {
    return {
      title: 'Podcast Not Found',
      description: 'The requested health podcast episode could not be found.',
    };
  }

  const canonical = getCanonicalUrl(locale, `/podcasts/${id}`);
  const alternates = getHreflangAlternates(`/podcasts/${id}`);
  const coverUrl = podcast.cover_image?.startsWith('http')
    ? podcast.cover_image
    : `${FULL_SITE_URL}/icon1.png`;

  return {
    title: `${podcast.title} — Health Podcast`,
    description: podcast.description.slice(0, 160),
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `${podcast.title} | ${BRAND_NAME} Podcasts`,
      description: podcast.description.slice(0, 160),
      url: canonical,
      siteName: BRAND_NAME,
      locale: locale,
      type: 'music.song',
      images: [
        {
          url: coverUrl,
          width: 800,
          height: 800,
          alt: podcast.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${podcast.title} | ${BRAND_NAME}`,
      description: podcast.description.slice(0, 160),
      images: [coverUrl],
    },
  };
}

export default async function PodcastDetailPage({ params }: PageProps) {
  const { id, locale } = await params;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const [podcast, { podcasts: allPodcasts }, episodes] = await Promise.all([
    fetchPodcastById(id),
    fetchPublishedPodcasts(1, 6),
    fetchPodcastEpisodes(),
  ]);

  if (!podcast) {
    notFound();
  }

  // Filter out the current podcast from related
  const relatedPodcasts = allPodcasts
    .filter((p) => p._id !== podcast._id)
    .slice(0, 3);

  // Find attached episode series if any
  const seriesEpisode = episodes.find(
    (ep) => ep._id === podcast.episode_id || ep.id === podcast.episode_id
  ) || null;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl(locale) },
    { name: 'Podcasts', url: getCanonicalUrl(locale, '/podcasts') },
    { name: podcast.title, url: getCanonicalUrl(locale, `/podcasts/${id}`) },
  ]);

  const podcastEpisodeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: podcast.title,
    description: podcast.description,
    url: getCanonicalUrl(locale, `/podcasts/${id}`),
    datePublished: podcast.created_at || podcast.updated_at,
    inLanguage: podcast.language || locale,
    duration: `PT${Math.floor((podcast.duration || 600) / 60)}M${(podcast.duration || 600) % 60}S`,
    image: podcast.cover_image,
    associatedMedia: {
      '@type': 'AudioObject',
      contentUrl: podcast.audio_url,
      encodingFormat: 'audio/mpeg',
    },
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: seriesEpisode?.name || 'UltimateHealth Community Podcasts',
      url: getCanonicalUrl(locale, '/podcasts'),
    },
    creator: {
      '@type': 'Person',
      name: podcast.authorName || 'UltimateHealth Clinical Contributor',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastEpisodeJsonLd) }}
      />
      <PodcastDetailClient
        podcast={podcast}
        relatedPodcasts={relatedPodcasts}
        seriesEpisode={seriesEpisode}
        locale={locale}
      />
    </>
  );
}
