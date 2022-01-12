import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, Posts } from "components";
import SearchForm from "components/SearchForm";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const { useQuery, useLazyQuery } = client;
  const { generalSettings } = useQuery({
    onError: (e) => {
      console.error(e);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [searchPosts, { isLoading, data: resultPosts }] = useLazyQuery(
    (query, term: string) => {
      return query.posts({
        where: {
          search: term,
        },
      });
    },
    {
      onCompleted(data) {},
      onError(error) {},
      // Default is 'network-only'
      // fetchPolicy: "network-only",
      retry: false,
      suspense: false,
    }
  );

  const handleSearchFormSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted form");
    searchPosts({
      args: searchTerm,
    });
  };

  useEffect(() => {
    const { search } = router.query;

    if (!isLoading && search && !resultPosts) {
      setSearchTerm(search.toString());
      searchPosts({ args: search.toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, resultPosts]);

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Search - {generalSettings.title}</title>
      </Head>

      <Hero title={`Search Results for: ${searchTerm}`}>
        <SearchForm
          query={searchTerm}
          setQuery={setSearchTerm}
          onFormSubmit={handleSearchFormSubmit}
        />
      </Hero>

      <main className="content content-single">
        <div className="wrap">
          {!isLoading && resultPosts?.nodes.length > 0 && (
            <Posts posts={resultPosts.nodes} />
          )}
          {isLoading && <p>Loading...</p>}
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
