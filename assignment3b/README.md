# Assignment 3

> - This week I focused on finishing my tree ring abstract clock by aadding the ring animation and interactions to the original idea.
> Last week it was about the overall appearance of the clock, and this week is about giving the functionality to it so it can respond to time in an unconventional way.
> This clock starts at the current time based on month() and day(), meaning that it will adjust its growth ring number and length accordingly.
> For example, if the current month is October and the current day is 15th of October, the clock will have 10 growth rings with another half completed ring at start.
> Each ring will represent a month of time passage, and each full ring consists of 30 days, meaning that the ring will complete a full circle in 30 days.
> Because I wanted to show more clearly about the passage of time, I decided to just anchor the tree ring clock's initial time to the actual calendar time, and for the time passage after the initial time will be fully based on the speed I set for the clock.
>
> - The color of the tree ring will change gradually within each full year, from a lightwood color to a darkwood color. I did this intentionally for a realistic tree ring surface because tree rings do get from a light to dark from based on seasonal factors and temperatures. Rings are light in Spring and dark in Winter.
> Also, the tree pith color will also change gradually based on customized time passage speed after initialliy anchored the time to the real calendar.
> Once the tree rings reach to their maximum amount, the tree barks will add another layer on top of itself. I did this to simulate the tree growth once every four year, despite I speed up this process by assigning the time passage rate to a customized speed.
> After every four years (4 year rings - 48 rings in total), the rings will default back to the calendar time and start again from there.
> For user convenience, I added a mouse interction so if the user hold their left mouse button, it will speed up the entire time elapsing rate to show the conccept of time passage in the way that relates to the most fundamental concept of time through nature objects.