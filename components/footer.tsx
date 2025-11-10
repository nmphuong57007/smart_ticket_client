"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Clapperboard,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10">
        {/* 5 cột: Brand + 4 cột link */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand + intro */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Clapperboard className="h-6 w-6" />
              <span className="font-bold text-xl">Smart Ticket</span>
            </div>

            <p className="text-sm text-muted-foreground leading-6">
              Building beautiful and functional ticket experiences with modern
              technologies. We help startups and businesses create their digital
              presence.
            </p>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild aria-label="Facebook">
                <Link href="https://facebook.com" target="_blank">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Instagram"
              >
                <Link href="https://instagram.com" target="_blank">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Twitter">
                <Link href="https://twitter.com" target="_blank">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Github">
                <Link href="https://github.com" target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* About Us */}
          <div className="space-y-3">
            <h4 className="font-semibold">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Company History
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Employee Handbook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-3">
            <h4 className="font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Google Ads
                </Link>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Helpful Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Support
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Link href="#" className="hover:underline">
                  Live Chat
                </Link>
                <Badge variant="secondary" className="px-1 py-0 text-[10px]">
                  •
                </Badge>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3">
            <h4 className="font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Link
                  href="mailto:hello@smartticket.com"
                  className="hover:underline"
                >
                  hello@smartticket.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <Link href="tel:+918637373116" className="hover:underline">
                  +91 8637373116
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Kolkata, West Bengal, India</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Smart Ticket. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
