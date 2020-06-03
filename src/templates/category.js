import React, { useRef } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout/layout';
import PropTypes from 'prop-types';
export default function Category({
  data,
  pageContext: {
    breadcrumb: { crumbs },
  },
}) {
  const linkRef = useRef();
  const category = data.markdownRemark;
  return (
    <Layout
      crumbs={crumbs}
      crumbLabel={category.frontmatter.title}
      displayActions={false}
    >
      <div className="w-full">
        <div className="rule-category rounded">
          <section className="mb-5 pb-2 rounded">
            <h2 className="cat-title py-4 px-12 rounded-t">
              {category.frontmatter.title}
              <span className="rule-count">
                {category.frontmatter.index.length}
              </span>
            </h2>
            <div
              className="description px-4 pt-0 pb-4"
              dangerouslySetInnerHTML={{ __html: category.html }}
            ></div>
            <div className="how-to-view text-center p-4 d-print-none">
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline1"
                  name="customRadioInline1"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label ml-1"
                  htmlFor="customRadioInline1"
                >
                  View titles only
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline2"
                  name="customRadioInline1"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label ml-1"
                  htmlFor="customRadioInline2"
                >
                  Show everything
                </label>
              </div>
            </div>
            <div className="p-12">
              {category.frontmatter.index.map((ruleUri, i) => {
                const rule = data.rule.nodes.find(
                  (r) => r.frontmatter.uri === ruleUri
                );
                if (rule) {
                  return (
                    <>
                      <section className="rule-content-title px-4">
                        <h1>
                          <Link ref={linkRef} to={`/${rule.frontmatter.uri}`}>
                            {rule.frontmatter.title}
                          </Link>
                        </h1>
                      </section>
                      <section className="rule-content px-4 mb-5">
                        <div dangerouslySetInnerHTML={{ __html: rule.html }} />
                      </section>
                    </>
                  );
                }
              })}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

Category.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`
  query($slug: String!, $index: [String]!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        index
      }
    }
    rule: allMarkdownRemark(filter: { frontmatter: { uri: { in: $index } } }) {
      nodes {
        frontmatter {
          uri
          title
        }
        html
      }
    }
  }
`;
