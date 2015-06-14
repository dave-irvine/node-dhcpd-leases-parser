DHCPDLeasesParser
====

This node module parses dhcpd.leases file, and also static leases definitions.

Why not use OMAPI?
----

Statically assigned addresses don't show up in OMAPI, so I had to parse static definitions.
