

'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import type { LiquidityPool, SelectedCurrency } from '@/lib/types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

// Client-side only component to prevent hydration mismatch
const FormattedCurrency = ({ value, currency }: { value: number, currency: SelectedCurrency }) => {
    const [formatted, setFormatted] = useState<string | null>(null);

    useEffect(() => {
        const convertedValue = value * currency.rate;
        setFormatted(
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency.symbol,
                notation: 'compact',
                maximumFractionDigits: 2,
            }).format(convertedValue)
        );
    }, [value, currency]);

    return <>{formatted || null}</>;
};

export function PoolsTable({ pools, currency }: { pools: LiquidityPool[], currency: SelectedCurrency }) {
    
    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pool</TableHead>
                            <TableHead>Network</TableHead>
                            <TableHead className="text-right">TVL</TableHead>
                            <TableHead className="text-right">Volume (24h)</TableHead>
                            <TableHead className="w-[150px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pools.map((pool) => (
                            <TableRow key={pool.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            <Image
                                                src={pool.token0.logo || 'https://placehold.co/24x24.png'}
                                                alt={pool.token0.name}
                                                width={24}
                                                height={24}
                                                className="rounded-full border-2 border-background"
                                            />
                                            <Image
                                                src={pool.token1.logo || 'https://placehold.co/24x24.png'}
                                                alt={pool.token1.name}
                                                width={24}
                                                height={24}
                                                className="rounded-full border-2 border-background"
                                            />
                                        </div>
                                        <span className="font-medium">{pool.token0.symbol}/{pool.token1.symbol}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{pool.network}</Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                    <FormattedCurrency value={pool.tvl} currency={currency} />
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                    <FormattedCurrency value={pool.volume24h} currency={currency} />
                                </TableCell>
                                <TableCell className="text-right">
                                     <Link href="/pools/add">
                                        <Button variant="outline" size="sm">
                                            Add Liquidity
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                     </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
