import React from "react"
import "katex/dist/katex.min.css"
import { BlockMath, InlineMath } from "react-katex"
import DOMPurify from "dompurify"

const LatexRenderer = ({ content, isInline = false }) => {
    if (!content) return <div className="latex-placeholder">Content will appear here</div>

    const renderMixedContent = () => {
        try {
            const segments = []
            let remaining = content

            while (remaining.length > 0) {
                // Find different types of math delimiters
                const doubleDollarStart = remaining.indexOf("$$")
                const inlineParenStart = remaining.indexOf("\\(")
                const displayBracketStart = remaining.indexOf("\\[")

                // Determine which delimiter comes first
                let nextMathStart = -1
                let nextMathEnd = -1
                let mathType = null
                let startDelimiter = ""
                let endDelimiter = ""

                // Check for $$ (but treat as inline if it's a short expression)
                if (doubleDollarStart >= 0) {
                    const nextDoubleDollar = remaining.indexOf("$$", doubleDollarStart + 2)
                    if (nextDoubleDollar > doubleDollarStart) {
                        const mathContent = remaining.substring(doubleDollarStart + 2, nextDoubleDollar).trim()

                        // Treat as inline if it's a short expression (like single variables or simple expressions)
                        const isShortExpression = mathContent.length < 20 && !mathContent.includes("\\") && !mathContent.includes("=")

                        nextMathStart = doubleDollarStart
                        nextMathEnd = nextDoubleDollar
                        mathType = isShortExpression ? "inline" : "display"
                        startDelimiter = "$$"
                        endDelimiter = "$$"
                    }
                }

                // Check for \[ \] (display math)
                if (displayBracketStart >= 0 && (nextMathStart < 0 || displayBracketStart < nextMathStart)) {
                    const bracketEnd = remaining.indexOf("\\]", displayBracketStart + 2)
                    if (bracketEnd > displayBracketStart) {
                        nextMathStart = displayBracketStart
                        nextMathEnd = bracketEnd
                        mathType = "display"
                        startDelimiter = "\\["
                        endDelimiter = "\\]"
                    }
                }

                // Check for $$ $$ (inline math)
                if (inlineParenStart >= 0 && (nextMathStart < 0 || inlineParenStart < nextMathStart)) {
                    const parenEnd = remaining.indexOf("\\)", inlineParenStart + 2)
                    if (parenEnd > inlineParenStart) {
                        nextMathStart = inlineParenStart
                        nextMathEnd = parenEnd
                        mathType = "inline"
                        startDelimiter = "\\("
                        endDelimiter = "\\)"
                    }
                }

                // If no math found, add remaining as HTML
                if (nextMathStart < 0) {
                    if (remaining.trim()) {
                        segments.push({
                            type: "html",
                            content: remaining,
                        })
                    }
                    break
                }

                // Add HTML before math
                if (nextMathStart > 0) {
                    const htmlContent = remaining.substring(0, nextMathStart)
                    if (htmlContent.trim()) {
                        segments.push({
                            type: "html",
                            content: htmlContent,
                        })
                    }
                }

                // Add math content
                if (nextMathEnd > nextMathStart) {
                    const mathContent = remaining.substring(nextMathStart + startDelimiter.length, nextMathEnd).trim()

                    if (mathContent) {
                        segments.push({
                            type: mathType,
                            content: mathContent,
                        })
                    }

                    remaining = remaining.substring(nextMathEnd + endDelimiter.length)
                } else {
                    // Unmatched delimiter, add as HTML
                    segments.push({
                        type: "html",
                        content: remaining.substring(nextMathStart),
                    })
                    remaining = ""
                }
            }

            // Render all segments
            return (
                <div className="latex-content">
                    {segments.map((segment, index) => {
                        try {
                            if (segment.type === "html") {
                                return <HTMLRenderer key={index} content={segment.content} />
                            } else if (segment.type === "display") {
                                return (
                                    <div key={index} className="math-display-wrapper">
                                        <BlockMath math={segment.content} />
                                    </div>
                                )
                            } else if (segment.type === "inline") {
                                return (
                                    <span key={index} className="math-inline-wrapper">
                                        <InlineMath math={segment.content} />
                                    </span>
                                )
                            }
                            return null
                        } catch (mathError) {
                            console.error(`Math rendering error for segment ${index}:`, mathError)
                            return (
                                <span key={index} className="latex-error">
                                    [Math Error: {segment.content}]
                                </span>
                            )
                        }
                    })}
                </div>
            )
        } catch (e) {
            console.error("Content rendering error:", e)
            return <div className="latex-error">Error rendering content: {e.message}</div>
        }
    }

    // For simple inline rendering
    const renderSimpleLatex = (text) => {
        try {
            // Remove $$ delimiters if present and render as inline
            const cleanText = text.replace(/^\$\$|\$\$$/g, "").trim()
            return <InlineMath math={cleanText} />
        } catch (e) {
            console.error("Simple LaTeX rendering error:", e)
            return <span className="latex-error">[LaTeX Error]</span>
        }
    }

    return isInline ? renderSimpleLatex(content) : renderMixedContent()
}

// Separate component to handle HTML content with images
const HTMLRenderer = ({ content }) => {
    if (!content) return null

    // Configure DOMPurify to allow images and common HTML elements
    const purifyConfig = {
        ALLOWED_TAGS: [
            "p",
            "br",
            "strong",
            "em",
            "u",
            "i",
            "b",
            "span",
            "div",
            "img",
            "a",
            "ul",
            "ol",
            "li",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "code",
            "pre",
        ],
        ALLOWED_ATTR: ["src", "alt", "title", "width", "height", "style", "class", "id", "href", "target", "rel"],
        ADD_ATTR: ["onerror", "onload"],
        ALLOW_DATA_ATTR: true,
    }

    // Process HTML to add error handling for images
    const processHTML = (html) => {
        return html.replace(/<img([^>]*?)src=["']([^"']*?)["']([^>]*?)>/gi, (match, beforeSrc, src, afterSrc) => {
            return `<img${beforeSrc}src="${src}"${afterSrc} 
                onerror="this.style.display='none'; this.nextSibling.style.display='inline';" 
                onload="this.nextSibling.style.display='none';"
                class="question-image"
              /><span class="image-error" style="display:none;">Image could not be loaded: ${src.split("/").pop()}</span>`
        })
    }

    const cleanHTML = DOMPurify.sanitize(processHTML(content), purifyConfig)

    return <span dangerouslySetInnerHTML={{ __html: cleanHTML }} className="html-content" />
}

export const cleanLatex = (text) => {
    if (!text) return ""
    return text
        .replace(/\\[{}]/g, "")
        .replace(/\\[([]/g, "")
        .replace(/\\[)\]]/g, "")
        .replace(/\$\$/g, "")
}

export default React.memo(LatexRenderer)
