"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
    children: React.ReactNode
    className?: string
    animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scaleIn"
    delay?: number
    duration?: number
}

export const AnimatedSection = ({
    children,
    className,
    animation = "fadeIn",
    delay = 0,
    duration = 600,
}: AnimatedSectionProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true)
                    }, delay)
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [delay])

    const animationClasses = {
        fadeIn: {
            initial: "opacity-0",
            animate: "opacity-100",
            transform: "",
        },
        slideUp: {
            initial: "opacity-0 translate-y-8",
            animate: "opacity-100 translate-y-0",
            transform: "",
        },
        slideLeft: {
            initial: "opacity-0 translate-x-8",
            animate: "opacity-100 translate-x-0",
            transform: "",
        },
        slideRight: {
            initial: "opacity-0 -translate-x-8",
            animate: "opacity-100 translate-x-0",
            transform: "",
        },
        scaleIn: {
            initial: "opacity-0 scale-95",
            animate: "opacity-100 scale-100",
            transform: "",
        },
    }

    const selectedAnimation = animationClasses[animation]

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all ease-out",
                `duration-[${duration}ms]`,
                isVisible ? selectedAnimation.animate : selectedAnimation.initial,
                className
            )}
            style={{ transitionDuration: `${duration}ms` }}
        >
            {children}
        </div>
    )
}
