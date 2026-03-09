---
title: "HackAssistant: A Hackathon Registration Platform"
description: "An open-source hackathon registration platform built for HackUPC and HackCU. Covers the application review system, automated emails, check-in platform, and the Django stack behind it."
---

**Managing hackers applications is probably the worst nightmare hackathon organizers have.** For this reason, after struggling with applications during HackUPC Fall 2016, I decided to use my knowledge to build a tool to make it easier: [HackAssistant](https://github.com/HackAssistant/registration). Now it's deployed for HackCU at [my.hackcu.org](https://my.hackcu.org).

At the beginning, we built a really simple system that performed the following tasks:

- **Easy and scalable application review process for organizers:** Allow all organizers to review hackers applications and provide feedback. This makes the review process more scalable. The system handles applications queue's for each organizer and normalizes the score per reviewer.
- **Automatic invite and confirm emails:** Make invite process simpler for organizers by allowing to send invites from the same interface. Confirmation, expiration and last reminders are all managed by the system.
- **Check-in platform:** QR code scanner and manual search check in interfaces. This allows to have multiple check-in tables without a hassle. With the confirmation email, hackers receive a QR code that when scanned checks them in.

It was quite simple. Me and the HackUPC WebDev team started coding it on December 2016. Now, after a year of additions, patches, refactors, new features, lots of bugs... we are releasing a new version. This version is the one that will be used to manage applications for HackCU IV as well.

This version includes the following features:

- **Hackers status view:** Allow hackers to check their application status at all times.
- **Travel reimbursement platform**: Allow hackers to submit receipts on the platform. Includes receipt review view and reimbursement management for organizers.
- **Team applications:** Allow hackers to apply as a team. Allows organizers to invites whole teams at the same time.
- **Automatic Slack invites:** Automatically invite the hacker to the hacker slack when they confirm that they will attend the hackathon.
- **Way less dependencies**: Removed Typeform as a dependency and minimized the project Python dependencies. This involved recreating some parts to avoid using libraries that included too many features.
- **Model simplification:** This doesn't affect the platform users, but the code has been simplified to allow an easier maintenance process.

## HackCU Dev Stack

**Backend:** Well this is mainly Django only. The reason I chose Django was because I had experience with it. Also, it's easy to deploy in development and considerably scalable for production. I acknowledge this was a completely biased choice.

**Emails:** We rely fully on SendGrid platform. Thanks to a partnership with them, we can send marketing campaigns and transactional email with ease. They have a small free tier, a really cheap paid tier ($9.95 a month) or if you are student you can get a discount in the [GitHub Developer pack](https://education.github.com/pack).

**Database:** We use SQLite for development. Django makes it easier as it's the default database and it works right out of the box. For production we use PostgreSQL with an automated script to upload backups to DropBox every 12 hours.

**Server:** Apache2 is our choice of front server. This is basically due to the fact that we didn't want to migrate to Nginx.

**Automated jobs:** We use a custom crontab command that runs every 2 hours to perform jobs that are asynchronous. This sends expiration emails and marks applications as expired.

## Community

We also added templates, a code of conduct and other features to allow the community to contribute to the project and allow for a more responsible development.

## Future work

The project is still under development. Some features that are coming next are:

- **Dashboard stats:** View applications stats from the organizer view
- **REST API:** Allow customization through external tools by allowing to access the data with a public REST API.
- **Public docker image:** Allow deployment with a Docker image.

This project is still evolving. When used in a hackathon, feedback is usually where you can find most of the inspiration for the platform to grow.

## Conclusions

This is the approach I decided to use to solve the problem of managing applications. It is highly influenced by my own experience and the experience of the teams I've been working with. Hope this helps you, the reader, to either understand our stack, build your own, use this for your own hackathon or whatever reason made you read this article.
